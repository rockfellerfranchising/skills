import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const skillPrefix = 'rockfeller-';
const requiredAgentFields = ['display_name', 'short_description', 'default_prompt'];
const errors: string[] = [];

function report(path: string, message: string): void {
	errors.push(`${path}: ${message}`);
}

async function isDirectory(path: string): Promise<boolean> {
	return (await stat(path)).isDirectory();
}

function frontmatter(content: string): string | undefined {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
	return match?.[1];
}

async function validateSkill(skill: string): Promise<void> {
	const skillPath = join(root, skill);
	const skillFile = join(skillPath, 'SKILL.md');
	const agentFile = join(skillPath, 'agents', 'openai.yaml');
	const referencesPath = join(skillPath, 'references');

	for (const path of [skillFile, agentFile]) {
		try {
			await stat(path);
		} catch {
			report(path, 'arquivo obrigatório ausente');
		}
	}

	try {
		if (!(await isDirectory(referencesPath))) report(referencesPath, 'diretório obrigatório ausente');
	} catch {
		report(referencesPath, 'diretório obrigatório ausente');
	}

	let content: string;
	try {
		content = await readFile(skillFile, 'utf8');
	} catch {
		return;
	}

	const header = frontmatter(content);
	if (!header) {
		report(skillFile, 'frontmatter YAML ausente ou inválido');
	} else {
		const fields = [...header.matchAll(/^([A-Za-z_][A-Za-z0-9_-]*):/gm)].map((match) => match[1]);
		if (fields.length !== 2 || !fields.includes('name') || !fields.includes('description')) {
			report(skillFile, 'frontmatter deve conter somente name e description');
		}
		const name = header.match(/^name:\s*(.+)$/m)?.[1]?.trim();
		if (name !== skill) report(skillFile, `name deve ser ${skill}`);
		if (!header.match(/^description:\s*\S/m)) report(skillFile, 'description não pode estar vazia');
	}

	try {
		const agent = await readFile(agentFile, 'utf8');
		for (const field of requiredAgentFields) {
			if (!new RegExp(`^\\s+${field}:\\s*\\S`, 'm').test(agent)) report(agentFile, `${field} é obrigatório`);
		}
	} catch {
		// A ausência do arquivo já foi registrada acima.
	}
}

const entries = await readdir(root);
const skills = entries.filter((entry) => entry.startsWith(skillPrefix) && !entry.includes('.'));

if (skills.length === 0) report(root, 'nenhuma skill rockfeller-* encontrada');
await Promise.all(skills.map(validateSkill));

if (errors.length > 0) {
	console.error(errors.join('\n'));
	process.exit(1);
}

console.log(`${skills.length} skills validadas.`);

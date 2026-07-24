#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.argv[2];
if (!root) {
	console.error('Usage: scan-tenant-queries.ts <directory>');
	process.exit(2);
}

const extensions = new Set(['.ts', '.tsx', '.js', '.jsx']);
const patterns = [
	{ label: 'ID-only database lookup', test: /(?:find(?:First|One)?|where)\s*\([^\n]*(?:\.id|\bid\b)[^\n]*\)/ },
	{ label: 'ID-only cache key', test: /(?:cache\.(?:get|set)|redis\.(?:get|set)|key:)[^\n]*(?:Id|_id)\b/i },
	{ label: 'Async payload without obvious scope', test: /(?:queue\.add|enqueue)\s*\([^\n]*\{[^\n]*\b(?:id|Id)\b[^\n]*\}/ },
];

async function files(directory: string): Promise<string[]> {
	const entries = await readdir(directory);
	const result: string[] = [];
	for (const entry of entries) {
		if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.git')) continue;
		const path = join(directory, entry);
		const info = await stat(path);
		if (info.isDirectory()) result.push(...(await files(path)));
		else if (extensions.has(entry.slice(entry.lastIndexOf('.')))) result.push(path);
	}
	return result;
}

for (const file of await files(root)) {
	const lines = (await readFile(file, 'utf8')).split('\n');
	for (const [index, line] of lines.entries()) {
		for (const pattern of patterns) {
			if (pattern.test.test(line) && !/tenantId|tenant_id|schoolId|school_id/.test(line)) {
				console.log(`${relative(root, file)}:${index + 1}: ${pattern.label}: ${line.trim()}`);
			}
		}
	}
}

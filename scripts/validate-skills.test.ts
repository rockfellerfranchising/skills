import { expect, test } from 'bun:test';

test('validates the skill packages in this repository', async () => {
	const process = Bun.spawn(['bun', 'scripts/validate-skills.ts'], {
		cwd: `${import.meta.dir}/..`,
		stderr: 'pipe',
		stdout: 'pipe',
	});

	expect(await process.exited).toBe(0);
});

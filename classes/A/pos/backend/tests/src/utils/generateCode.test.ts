import { describe, it, expect } from 'vitest';
import { generateSixDigitCode } from '../../../src/utils/generateCode.util.ts';

describe('generate code test', () => {
    it('should generate a code with 6 digits', () => {
        const code = generateSixDigitCode();
        expect(typeof code).toBe('string');
        expect(code).toMatch(/^\d{6}$/);
    });

    it('should generate positive integers', () => {
        const code = Number(generateSixDigitCode());
        expect(Number.isInteger(code)).toBe(true);
        expect(code).toBeGreaterThanOrEqual(100000);
        expect(code).toBeLessThanOrEqual(999999);
    });

    it('should generate different codes', () => {
        const codes = new Set<string>();
        for (let i = 0; i < 10; i++) {
            codes.add(generateSixDigitCode());
        }
        expect(codes.size).toBeGreaterThan(1);
    });
});
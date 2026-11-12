import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, comparePassword } from "../../../src/utils/password.util.ts";

describe("password.util", () => {
  const password1 = "ClaveUno123!";
  const password2 = "ClaveDos456!";
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it("generates non-empty hashes that differ from the original password", () => {
    expect(typeof hash1).toBe("string");
    expect(hash1.length).toBeGreaterThan(0);
    expect(hash1).not.toBe(password1);

    expect(typeof hash2).toBe("string");
    expect(hash2.length).toBeGreaterThan(0);
    expect(hash2).not.toBe(password2);
  });

  it("returns true when the password is correct", async () => {
    expect(await comparePassword(password1, hash1)).toBe(true);
    expect(await comparePassword(password2, hash2)).toBe(true);
  });

  it("returns false when the password is incorrect", async () => {
    expect(await comparePassword(password2, hash1)).toBe(false);
    expect(await comparePassword(password1, hash2)).toBe(false);
  });
});
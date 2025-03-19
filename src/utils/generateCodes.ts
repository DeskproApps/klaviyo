// Function to URL-safe base64 encode a string
function base64UrlEncode(input: ArrayBuffer): string {
    const uint8Array = new Uint8Array(input);
    let binaryString = '';
    uint8Array.forEach(byte => {
        binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// Generate a code_verifier (random 32-byte string)
function generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array); // Generate random 32-byte array
    return base64UrlEncode(array.buffer);
}

// Generate a code_challenge by applying SHA-256 on the code_verifier
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data); // SHA-256 hash
    return base64UrlEncode(hashBuffer);
}

// Generate both code_verifier and code_challenge
export async function generateCodes(): Promise<{ codeVerifier: string, codeChallenge: string }> {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    return {
        codeVerifier,
        codeChallenge
    };
}

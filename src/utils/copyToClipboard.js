export async function copyToClipboard(content) {
    try {
        await navigator.clipboard.writeText(content);
        /* Resolved - text copied to clipboard successfully */
    } catch (err) {
        /* Rejected - text failed to copy to the clipboard */
    }
}
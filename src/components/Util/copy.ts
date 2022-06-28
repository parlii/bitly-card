export async function copyToClipboard(text: string): Promise<void> {
  try {
    return await window.navigator.clipboard.writeText(text);
  } catch (err) {
    if (err instanceof DOMException) return legacyCopyToClipboard(text);

    throw new Error(`copy to clipboard failed: ${err}`);
  }
}

const legacyCopyToClipboard = async (text: string) => {
  const temp = document.createElement('input');
  document.body.appendChild(temp);
  temp.value = text;
  temp.focus();
  document.execCommand('SelectAll');
  document.execCommand('Copy', false);
  document.body.removeChild(temp);
};

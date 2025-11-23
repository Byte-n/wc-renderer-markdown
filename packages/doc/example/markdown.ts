export function steamMarkdownContent (
  cb: (text: string) => void,
) {
  let i = 0;
  const timer = setInterval(() => {
    i += 1;
    if (i > streamContent.length) {
      clearInterval(timer);
      return;
    }
    cb(streamContent.slice(0, i));
  }, 5);
}


export const streamContent = `
# 1.标题1

## 2.标题2

### 3.标题3

#### 4.标题4
`;


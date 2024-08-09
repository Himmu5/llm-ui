import { FC, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Components } from 'react-markdown';

type P = {
  markdownContent: string;
};

const CustomMarkdown: FC<P> = ({ markdownContent }) => {
    console.log(markdownContent)
  const components: Components = {
    strong: ({ node, ...props }) => {
      return (
        <strong className="font-semibold text-blue-600" {...props} />
      );
    }
  };

  return (
    <ReactMarkdown className={"w-full"} components={components} remarkPlugins={[remarkGfm]}>
      {markdownContent}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;

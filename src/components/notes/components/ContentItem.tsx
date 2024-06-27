import { useState } from "react";
const ContentItem = () => {
  const [editing, setEditing] = useState(false);
  const [active, setActive] = useState(true);
  const [markdown, setMarkdown] = useState(`# heading \n > quote`);

  return <div>{/* <ContentMarkdownEditor /> */}</div>;
};

export default ContentItem;
/**
 * 
 * {editing ? (
        <div className="bg-yellow-200 h-6 w-full">
          
        
        选中时出现
        edit
        delete
        save cancel
        滚动停靠
        
        </div>
      ) : (
        <div className="group relative cursor-pointer">
          { when hovering, come out the 'edit' / 'delete' button }
          <div className="absolute top-0 right-2 translate-x-full scale-0 group-active:block group-focus:translate-x-0 group-focus:scale-100 transition-all">
            <button>edit</button>
            <button>delete</button>
          </div>
          <Markdown className={"prose-sm dark:prose-invert sm:prose"}>
            {markdown}
          </Markdown>
        </div>
      )} 
 */

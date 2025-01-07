import React from "react";
import markdownIt from "markdown-it";

const md = markdownIt({
	html: true,
	linkify: false,
	typographer: true,
});

interface MarkdownContentProps {
	content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
	const renderedHtml = md.render(content);
	return (
		<div
			className="prose prose-lg max-w-none"
			dangerouslySetInnerHTML={{ __html: renderedHtml }}></div>
	);
};

export default MarkdownContent;

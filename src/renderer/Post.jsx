import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { markdownToHtml } from './markdown';
import { getPost } from './api';
import useErrorHandler from './use-error-handle';

function PostSkeleton() {
  return (
    <div className="skeletons">
      <div
        className="skeleton v1 d-block mb-3"
        style={{ width: '100%', height: '5rem' }}
      />
      <div
        className="skeleton v1 d-block mb-3"
        style={{ width: '50%', height: '1.5rem' }}
      />
      <div
        className="skeleton v1 d-block mb-3"
        style={{ width: '25%', height: '1.5rem' }}
      />
    </div>
  );
}

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [first, ...rest] = useOutletContext();
  const errorHandler = useErrorHandler();

  const postId = slug ?? first;

  useEffect(() => {
    if (!postId) {
      return;
    }

    setLoading(true);
    getPost(postId)
      .then(({ data }) => {
        markdownToHtml(data || '').then((html) => {
          setPost(html);
          setLoading(false);
        });
      })
      .catch(errorHandler);
  }, [postId, errorHandler]);

  const RenderView = loading ? (
    <PostSkeleton />
  ) : (
    <div className="markdown" dangerouslySetInnerHTML={{ __html: post }} />
  );

  return <div className="post">{RenderView}</div>;
}

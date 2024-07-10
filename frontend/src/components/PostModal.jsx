import React from 'react';
import { Modal, Typography, Button, Image } from 'antd';
import { createMarkup, decodeCDATA, formatDate } from '../assistants/helpers/helpers'; // Adjust path as needed
import './../index.css'

const PostModal = ({ visible, onClose, post }) => {

    return (
        <Modal
            title={<Typography.Title level={3}>{post?.title ? post.title : ''}</Typography.Title>}
            open={visible} 
            onCancel={onClose}
            width={900}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        >
            {post && (
                <React.Fragment>
                    <Typography.Paragraph>{`Created on ${formatDate(post.pubDate) || ''} by ${post.creator || ''}`}</Typography.Paragraph>
                    <Typography.Paragraph>{post.description}</Typography.Paragraph>
                    <Typography.Paragraph>
                        The source version you can find at
                        <Typography.Link href={post.source}>{post.source}</Typography.Link>
                    </Typography.Paragraph>
                    {post.thumbnail && <Image src={post.thumbnail} />}
                    {post.content && (
                        <div className="decoded-html" dangerouslySetInnerHTML={createMarkup(decodeCDATA(post.content))} />
                    )}
                </React.Fragment>
            )}
        </Modal>
    );
};

export default PostModal;
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { Card, Space, Typography, Image, Row, Col, Pagination, Button, Flex } from "antd";
import "./../../src/index.css";
import PostModal from "../components/PostModal";
import { $api } from "../assistants/http";
import { formatDate } from "../assistants/helpers/helpers";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [selectedPost, setSelectedPost] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const pageSize = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await $api.get('/posts');
        setPosts(response.data.posts);
        setTotalPosts(response.data.totalPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const memoizedPosts = useMemo(() => posts, [posts]);
  const handlePageChange = async (page) => {
    try {
      const response = await $api.get(`/posts?page=${page}`);
      setCurrentPage(page);
      if (response.data.posts?.length) {
        console.log('works');
        setPosts(response.data.posts); 
      } 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }


  const handlePostClick = useCallback(async (postId) => {
    
    try {
      const response = await $api.get(`/posts/${postId}`);
      setSelectedPost(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleButtonClick = useCallback((postId) => {
    handlePostClick(postId);
  }, [handlePostClick]);

  return (
    <Space direction="vertical" align="center" className="feed-container">
      <Row style={{ padding: 16 }} gutter={[16, 16]} justify="start">
        {memoizedPosts.map((post) => (
          <Col span={6} key={post._id}>
            <Card
              hoverable
              className="post-card"
              title={<Typography.Title level={4}>{post.title}</Typography.Title>}
            >
              <Typography.Paragraph>{`Created on ${formatDate(post.pubDate)} by ${post.creator}`}</Typography.Paragraph>
              <Typography.Paragraph>{post.description}</Typography.Paragraph>
              <Image src={post.thumbnail} />
              <Flex justify="center" style={{ marginTop: 10 }}>
                <Button onClick={() => handleButtonClick(post._id)}>See whole post</Button>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        total={totalPosts}
        pageSize={pageSize}
        onChange={handlePageChange}
        className="pagination"
      />
      <PostModal visible={modalVisible} onClose={handleModalClose} post={selectedPost} />
    </Space>
  );
};

export default Feed;
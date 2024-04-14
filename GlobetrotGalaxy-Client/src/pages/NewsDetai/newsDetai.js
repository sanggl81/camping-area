import React, { useState, useEffect } from "react";
import "./newsDetai.css";
import { DatePicker, Input, Spin, Breadcrumb } from "antd";
import { Card, notification } from "antd";
import { useHistory } from "react-router-dom";
import postsApi from "../../apis/postsApi";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";

// const { Search } = Input;

const NewsDetai = () => {
  const [news, setNews] = useState([]);
  let history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        await postsApi.getPostById(id).then((item) => {
          console.log(item);
          setNews(item[0]);
        });
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Spin spinning={false}>
        <Card className="container_details">
          <div className="product_detail">
            <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
              <Breadcrumb>
                <Breadcrumb.Item href="http://localhost:3500/home">
                  <span>Trang chủ</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="http://localhost:3500/news">
                  <span>Tin tức</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <span>{news.name}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <hr></hr>
            <div class="pt-5-container">
              <div class="newsdetaititle">{news?.title}</div>
              <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default NewsDetai;

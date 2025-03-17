//axios 사용 예시
//선언해둔 client 불러와서 사용

// import { client } from './axios';

// // 게시글 조회
// export const getPostDetail = async (postId) => {
//   try {
//     const { data } = await client.get(`/post/${postId}`);
//     return data.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// // 게시글 삭제
// export const deletePost = async (postId) => {
//   try {
//     const { data } = await client.delete(`/post/${postId}`);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// // 댓글 생성
// export const createComment = async (postId, content) => {
//   try {
//     const { data } = await client.post(`/post/${postId}/comment`, { content });
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

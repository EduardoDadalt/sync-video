import { GetServerSideProps } from "next";
import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import Video from "../../components/Video";
import { firestore } from "../../config/fire";
export default function Home(video) {
  return (
    <>
      <Head>
        <title>Sync Video</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row className="m-0 fullscreen">
        <Col sm={12} className="p-0 h-100">
          <Video {...video} />
        </Col>
        {/* <Col sm={4} className="p-0">
          <Chat />
        </Col> */}
      </Row>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const snapshot = await firestore
    .collection("video")
    .doc(String(ctx.query.id))
    .get();
  if (snapshot.exists) {
    const { src, play } = snapshot.data();
    return { props: { src, play } };
  }
  return { props: { src: "/video.mp4" } };
};

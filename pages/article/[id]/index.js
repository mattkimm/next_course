import { server } from "../../../config";
import Meta from "../../../components/Meta";
import { useRouter } from "next/router";
import Link from "next/link";
import { id } from "prelude-ls";

export default function Article({ article }) {
  //   const router = useRouter();
  //   const { id } = router.query;

  return (
    <>
      <Meta title={article.title} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </>
  );
}

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  // need to return path object , it needs to formatted as a string
  return {
    //  paths : {
    //       params : { id : '1', id : '2'}
    //  }
    paths,
    fallback: false, // which means if we go something that doesn't exist in the data
    // it's going to return 404 page
  };
};

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();

//   return {
//     props: {
//       article,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
//   const articles = await res.json();

//   const ids = articles.map((article) => article.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   // need to return path object , it needs to formatted as a string
//   return {
//     //  paths : {
//     //       params : { id : '1', id : '2'}
//     //  }
//     paths,
//     fallback: false, // which means if we go something that doesn't exist in the data
//     // it's going to return 404 page
//   };
// };

import Router from 'next/router'
import {useEffect} from "react";

export default function Home() {
  useEffect(function (){
    Router.push("admin/painel");
  })
  return (
      <></>
  );
}

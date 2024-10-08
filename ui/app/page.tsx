import { redirect } from "next/navigation";
import { getUserDetails } from "./signin/actions";

export default async function Home() {
  const userDetails = await getUserDetails();
  if (userDetails === null) {
    return redirect("/signin");
  }
  else {
    return redirect("/posts");
  }
}

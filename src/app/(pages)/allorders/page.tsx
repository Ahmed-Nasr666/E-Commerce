
import { jwtDecode } from "jwt-decode";
import GetOrders from "@/components/getOrders/getOrders";
import { getUserToken } from "@/Helpers/getUserToken";

export default async function AllOrdersPage() {
  const token = await getUserToken();

 

  const decoded: any = jwtDecode(token!);
  const userId = decoded.id; 

  return <GetOrders userId={userId} />;
}

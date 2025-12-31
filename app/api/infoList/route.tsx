import infoListModel from "@/db/models/InfoListModel";

export async function GET() {
  const infoLists = await infoListModel.findAll();
  return Response.json(infoLists);
}

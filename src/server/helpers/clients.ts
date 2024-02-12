import {
  Doc,
  IClient,
  IDisplayClient,
  IUser,
  RoleType,
  roleType,
} from "interfaces";
import mongoose, { Model } from "mongoose";
import { connect, disconnect } from "server/database";
import { Client } from "server/models";
import { getLotsByClientId } from "./lots";
import { uploadFile } from "server/lib/s3";

export async function getDisplayClients(
  user: IUser
): Promise<IDisplayClient[]> {
  try {
    const { role } = user;
    await connect();
    const clients = (
      role === roleType.admin
        ? await Client.find()
        : await Client.find({
            registeredBy: user._id,
          })
    ) as IClient[];
    await disconnect();
    const displayClients = clients.map(
      ({ name, registeredByName, phoneNumber, _id }) => ({
        name,
        registeredByName,
        phoneNumber,
        _id,
      })
    );
    return displayClients;
  } catch (error) {
    console.log("getDisplayClients(): ", { error });
    await disconnect();
    return [];
  }
}

export async function createClient({
  phoneNumber,
  name,
  user,
}: {
  phoneNumber: string;
  name: string;
  user: IUser;
}): Promise<null | IClient> {
  try {
    const { _id, dispName } = user;
    await connect();
    const newClient = new Client({
      name: name.toLowerCase(),
      phoneNumber,
      registeredByName: dispName,
      registeredBy: _id,
    });
    await newClient.save();
    await disconnect();
    return newClient;
  } catch (error) {
    await disconnect();
    console.log("createClient(): ", { error });
    return null;
  }
}

export async function getClient(id: string) {
  try {
    await connect();
    const client = await Client.findById(id);
    await disconnect();
    return client;
  } catch (error) {
    await disconnect();
    console.log("getClient(): ", { error });
    return null;
  }
}

export async function getClientWithLots(id: string) {
  try {
    const client = await getClient(id);
    if (!client) return null;
    const lots = await getLotsByClientId(client._id);
    return { ...client.toObject(), lots };
  } catch (error) {}
}

export async function editClient(
  id: string | mongoose.Types.ObjectId,
  phoneNumber: string,
  name: string
): Promise<null | IClient> {
  try {
    await connect();
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { phoneNumber, name },
      {
        new: true,
      }
    );
    await disconnect();
    return updatedClient;
  } catch (error) {
    console.log("editClient(): ", { error });
    await disconnect();
    return null;
  }
}

export async function getClientsSearch(searchTerm: string) {
  try {
    await connect();
    let clients: any[] = [];
    const client = await getClient(searchTerm);
    const lots = await getLotsByClientId(client?._id);
    if (client) {
      client.lots = lots;
      clients.push(client);
      return [...clients];
    }
    const phoneNumber = searchTerm.replace(/ /g, "");
    clients = await Client.find({
      phoneNumber: { $regex: `${phoneNumber}`, $options: "i" },
    });
    if (clients.length) return clients;
    clients = await Client.find({
      name: { $regex: `${searchTerm.toLowerCase()}`, $options: "i" },
    });
    return clients;
  } catch (error) {
    console.log({ error });
    return [];
  }
}

export async function clientAddDoc(
  doc: { key: string; name: string },
  id: string
) {
  try {
    await connect();
    const { key, name } = doc;
    const client = await getClient(id);
    // const signedUrl = await getSignedURL("");

    await disconnect();
    return client;
  } catch (error) {}
}

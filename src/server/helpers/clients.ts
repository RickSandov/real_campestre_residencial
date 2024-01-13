import { IClient, IDisplayClient, IUser, RoleType, roleType } from "interfaces";
import mongoose from "mongoose";
import { connect, disconnect } from "server/database";
import { Client } from "server/models";

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
      name,
      phoneNumber,
      registeredByName: dispName,
      registeredBy: _id,
    });
    await newClient.save();
    await disconnect();
    console.log({ newClient });
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

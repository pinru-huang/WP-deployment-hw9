// import item from "../models/item";
import item from "../models/item.js";

const Mutation = {
  createItem: async (parent, { input }, {itemModel, pubSub}) => {
    const newItem = new itemModel(input);
    await newItem.save();
    pubSub.publish("ITEM_CREATED", {
      itemCreated: newItem,
    });
    return newItem;
  },

  updateItem: async (parent, { input }, {itemModel, pubSub}) => {
    const item = await itemModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          name: input.name,
          amount: input.amount,
          category: input.category,
          date: input.date,
          description: input.description,
        },
      }
    );
    const newItem = {
      id: input.id ?? item.id,
      name: input.name ?? item.name,
      amount: input.amount ?? item.amount,
      category: input.category ?? item.category,
      date: input.date ?? item.date,
      description: input.description ?? item.description,
    }
    pubSub.publish("ITEM_UPDATED", {
      itemUpdated: newItem,
    });
    return newItem;
  },
  // TODO 5.2 Define the itemDelete mutation resolver
  deleteItem: async (parent, { id }, {itemModel, pubSub}) => {
    console.log("Delete Item in Mutation resolver")
    console.log(id)
    const delItem = await itemModel.deleteOne({ id });
    console.log(delItem)
     // TODO 6.3 Publish itemDeleted
    pubSub.publish("ITEM_DELETED", {
      itemDeleted: id,
    });
    return id;
  },
 

  // TODO 5.2 End
  // TODO 6.3 End

};

export default Mutation;

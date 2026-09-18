export async function findSortedTimeline(model) {
  return model.find().select("date value -_id").sort({ date: 1 }).lean().exec();
}

export async function findAllLean(model) {
  return model.find().select("-__v -createdAt -updatedAt").lean().exec();
}

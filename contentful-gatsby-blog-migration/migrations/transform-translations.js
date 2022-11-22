// Request: Copy content of blogPost > description field, from en-US to en-GB
module.exports = (migration) => {
  const transformTranslations = (fieldId) => async (
    fromFields,
    currentLocale
  ) => {
    // { targetLocale: sourceLocaleToCopyDataFrom }
    const map = { "en-GB": "en-US" };

    if (
      Object.keys(map).includes(currentLocale) &&
      fromFields[fieldId] &&
      fromFields[fieldId][map[currentLocale]]
    ) {
      console.log(fromFields[fieldId][map[currentLocale]]);
      return {
        [fieldId]: fromFields[fieldId][map[currentLocale]],
      };
    } else {
      console.log("undefined");
      return;
    }
  };

  migration.transformEntries({
    contentType: "blogPost", // (required) - Api Identifier
    from: ["description"], // (required) - Array of the source field IDs
    to: ["description"], // (required) - Array of the target field IDs
    transformEntryForLocale: transformTranslations("description"),
    // shouldPublish: "preserve", // (optional) – If true, both the source and the derived entries will be published. If false, both will remain in draft state. If preserve, will keep current states of the source entries (default true)
  });
};

// import "./App.css";
import type { StrictRJSFSchema, UiSchema } from "@rjsf/utils";
import { PlaygroundPage } from "./pages/playground/playground-page";

const schema: StrictRJSFSchema = {
	title: "Root Schema",
	type: "object",
	// required: ["string_field"],
	properties: {
		string_field: {
			type: "string",
			// title: "String Field",
			// description: "This is a string field",
			// default: "default value",
			const: "const value",
			readOnly: true,
		},
		number_field: { type: "number" },
		integer_field: { type: "integer" },
		boolean_field: { type: "boolean" },
		null_field: { type: "null" },
		array_field: {
			type: "array",
			// To transform into multiple-choice list, set uniqueItems: true and provide items.enum: []
			// uniqueItems: true,
			// additionalItems: {
			// 	type: 'boolean'
			// },
			// minItems: 2, // Even if this property is required an empty array is valid. Set minItems to make it invalid.
			items: {
				type: "string",
				enum: ["a", "b"],
			},
		},
		number_with_enum_field: {
			type: "number",
			enum: [1, 2],
		},
		number_with_any_of_field: {
			type: "number",
			anyOf: [
				{
					type: "number",
					title: "one",
					enum: [1],
				},
				{
					type: "number",
					title: "two",
					enum: [2],
				},
				{
					type: "number",
					title: "three",
					enum: [3],
				},
			],
		},
		number_with_one_of_field: {
			type: "number",
			oneOf: [
				{ const: 1, title: "one" },
				{ const: 2, title: "two" },
				{ const: 3, title: "three" },
			],
		},
		multi_type_field: {
			type: ["string", "null"],
		},
		custom_multi_select: {
			type: "array",
			items: {
				type: "string",
				enum: ["a", "b", "c"],
			},
			// default: ["b"],
		},
		object_field: {
			type: "object",
			properties: {
				hidden_string_field: {
					type: "string",
					meta: {
						hidden: true,
					},
				},
				nested_object_field: {
					properties: {
						nested_string_field: { type: "string" },
						double_nested_object_field: {
							properties: {
								nested_string_field: { type: "string" },
							},
						},
					},
				},
			},
		},
	},
};

const uiSchema: UiSchema = {
	string_field: {
		"ui:title": "String Field",
		"ui:help": "Hint: Make it strong!",
		"ui:autofocus": true,
		"ui:emptyValue": "",
		"ui:placeholder":
			"ui:emptyValue causes this field to always be valid despite being required",
		"ui:autocomplete": "family-name",
		"ui:enableMarkdownInDescription": true,
		"ui:description":
			"Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/).",
	},
	number_with_enum_field: {
		"ui:enumNames": ["option a", "option b"], // Give labels to render for the enum values
		"ui:enumDisabled": [1], // Disable an enum
	},
	// array_field: {
	// 	"ui:options": {
	// 		orderable: false,
	// 		addable: false,
	// 		copyable: true,
	// 		removable: false,
	// 	},
	// 	"ui:widget": "checkboxes", // If the field is multiple-choice renders as checkboxes
	// },
	custom_multi_select: {
		"ui:widget": "MyMultiSelectWidget",
	},
};

function App() {
	return <PlaygroundPage />;
}

export default App;

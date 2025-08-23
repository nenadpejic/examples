// import "./App.css";
import { Form } from "@rjsf/mui";
import type { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { type ChangeEvent, useState } from "react";
import z from "zod";

const schema: RJSFSchema = {
	title: "Root Title",
	type: "object",
	// required: ["stringField"],
	properties: {
		stringField: {
			type: "string",
			// title: "Title",
			// description: "Your title goes here",
			// default: "A new task",
		},
		numberField: { type: "number" },
		integerField: { type: "integer" },
		booleanField: { type: "boolean" },
		nullField: { type: "null" },
		arrayField: {
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
		numberWithEnumField: {
			type: "number",
			enum: [1, 2],
		},
		numberWithAnyOfField: {
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
		numberWithOneOfField: {
			type: "number",
			oneOf: [
				{ const: 1, title: "one" },
				{ const: 2, title: "two" },
				{ const: 3, title: "three" },
			],
		},
		multiType: {
			type: ["string", "null"],
		},
		customMultiSelect: {
			type: "array",
			title: "Custom Multi-Select",
			items: {
				type: "string",
				enum: ["a", "b", "c"],
			},
		},
	},
};

const uiSchema: UiSchema = {
	numberWithEnumField: {
		"ui:enumNames": ["option a", "option b"], // Give labels to render for the enum values
		"ui:enumDisabled": [1], // Disable an enum
	},
	// arrayField: {
	// 	"ui:options": {
	// 		orderable: false,
	// 		addable: false,
	// 		copyable: true,
	// 		removable: false,
	// 	},
	// 	"ui:widget": "checkboxes", // If the field is multiple-choice renders as checkboxes
	// },
	customMultiSelect: {
		"ui:widget": "CustomMultiSelect",
	},
};

const CustomMultiSelectSchema = z.object({
	items: z.object({
		enum: z.array(z.string()),
		type: z.string(),
	}),
	title: z.string(),
	type: z.literal("array"),
});

const CustomMultiSelect = (props: WidgetProps) => {
	const { schema, onChange, value, label, id } = props;
	const parsedSchema = CustomMultiSelectSchema.safeParse(schema);

	if (!parsedSchema.success) {
		return (
			<div style={{ color: "red" }}>
				<p>{parsedSchema.error.name}</p>
				<pre>{parsedSchema.error.message}</pre>
			</div>
		);
	}

	const options = parsedSchema.data.items.enum;

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = [...e.target.selectedOptions].map(
			(option) => option.value,
		);
		onChange(newValue);
	};

	return (
		<div>
			<label style={{ display: "block" }} htmlFor={id}>
				{label}
			</label>
			<select
				style={{ width: "100%" }}
				id={id}
				multiple
				value={value}
				onChange={handleChange}
			>
				{options.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};

const widgets = {
	CustomMultiSelect,
};

// NOTE: defaultFormData overrides default values set in schema
const defaultFormData = {
	title: "First task",
	done: true,
};

function App() {
	const [formData, setFormData] = useState(defaultFormData || null);

	return (
		<Form
			schema={schema}
			validator={validator}
			uiSchema={uiSchema}
			formData={formData}
			widgets={widgets}
			// By default Form is uncontrolled, assign formData and onChange to make it controlled
			onChange={(e) => {
				console.log("changed", e.formData);
				setFormData(e.formData);
			}}
			onSubmit={(e) => console.log("submitted", e.formData)}
			onError={(errors) => console.log("errors", errors)}
			noHtml5Validate // This disables the "Please fill out this field." html validation
		/>
	);
}

export default App;

// import "./App.css";
import { Form } from "@rjsf/mui";
import type {
	RJSFSchema,
	StrictRJSFSchema,
	UiSchema,
	WidgetProps,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { merge } from "lodash";
import { type ChangeEvent, useMemo, useState } from "react";
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
		nestedObject: {
			type: "object",
			properties: {
				hiddenStringField: {
					type: "string",
					meta: {
						hidden: true,
					},
				},
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
		"ui:widget": "CustomMultiSelectWidget",
	},
};

const CustomMultiSelectSchema = z.object({
	title: z.string().optional(),
	type: z.literal("array"),
	items: z.object({
		enum: z.array(z.string()),
		type: z.string(),
	}),
});

const CustomMultiSelectWidget = (props: WidgetProps) => {
	const { schema, onChange, value, label, id, name } = props;
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
				{label || name}
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
	CustomMultiSelectWidget,
};

// NOTE: defaultFormData overrides default values set in schema
const defaultFormData = {
	title: "First task",
	done: true,
};

type MatcherFn = (schema: StrictRJSFSchema, key?: string) => UiSchema | null;

const walkSchema = (
	schema: StrictRJSFSchema,
	matcherFn: MatcherFn,
	currentKey?: string,
): UiSchema => {
	const result: UiSchema = {};

	const match = matcherFn(schema, currentKey);
	if (match !== null) {
		return match;
	}

	// If schema has properties, recurse into them
	if (schema.properties && typeof schema.properties === "object") {
		for (const [key, value] of Object.entries(schema.properties)) {
			const childResult = walkSchema(
				value as StrictRJSFSchema,
				matcherFn,
				`${currentKey || "root"}.${key}`,
			);
			if (childResult && Object.keys(childResult).length > 0) {
				result[key] = childResult;
			}
		}
	}

	return result;
};

function App() {
	const [formData, setFormData] = useState(defaultFormData || null);

	const builtUiSchema = useMemo(() => {
		const matcherFn: MatcherFn = (schema, _key) => {
			if (schema.meta?.hidden === true) {
				return { "ui:widget": "hidden" };
			}

			return null;
		};
		const built = walkSchema(schema, matcherFn);
		const merged = merge({}, uiSchema, built);

		return merged;
	}, []);

	return (
		<Form
			schema={schema}
			validator={validator}
			uiSchema={builtUiSchema}
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
			idSeparator="."
		/>
	);
}

export default App;

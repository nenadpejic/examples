import type FormType from "@rjsf/core";
import type { FormProps } from "@rjsf/core";
import { Form, Templates } from "@rjsf/mui";
import {
	type BaseInputTemplateProps,
	ErrorSchemaBuilder,
	type ObjectFieldTemplateProps,
	type StrictRJSFSchema,
	type UiSchema,
	type WidgetProps,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { merge } from "lodash";
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import z from "zod";
import { MyTableWidget } from "./widgets/my-table-widget";

const {
	// ArrayFieldDescriptionTemplate,
	// ArrayFieldItemTemplate,
	// ArrayFieldTemplate,
	// ArrayFieldTitleTemplate,
	BaseInputTemplate,
	// ButtonTemplates,
	// DescriptionFieldTemplateˆ,
	// ErrorListTemplate,
	// FieldErrorTemplate,
	// FieldHelpTemplate,
	// FieldTemplate,
	ObjectFieldTemplate,
	// TitleFieldTemplate,
	// UnsupportedFieldTemplate,
	// WrapIfAdditionalTemplate,
} = Templates;

const MyBaseInputTemplate = (props: BaseInputTemplateProps) => {
	if (!BaseInputTemplate) return null;

	return (
		<BaseInputTemplate
			{...props}
			slotProps={{ inputLabel: { shrink: true } }}
		/>
	);
};

const MyObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
	if (!ObjectFieldTemplate) return null;

	const { idSchema } = props;

	if (idSchema.$id.split(".").length < 3) {
		return <ObjectFieldTemplate {...props} />;
	}

	return (
		<div
			style={{
				margin: 0,
				paddingLeft: "2rem",
				borderLeft: "1px solid lightgray",
			}}
		>
			<ObjectFieldTemplate {...props} />
		</div>
	);
};

const templates = {
	// Default
	// ArrayFieldDescriptionTemplate: MyArrayFieldDescriptionTemplate
	// ArrayFieldItemTemplate: MyArrayFieldItemTemplate
	// ArrayFieldTemplate: MyArrayFieldTemplate,
	// ArrayFieldTitleTemplate: MyArrayFieldTitleTemplate
	BaseInputTemplate: MyBaseInputTemplate,
	// ButtonTemplates: MyButtonTemplates
	// DescriptionFieldTemplateˆ: MyDescriptionFieldTemplateˆ
	// ErrorListTemplate: MyErrorListTemplate
	// FieldErrorTemplate: MyFieldErrorTemplate
	// FieldHelpTemplate: MyFieldHelpTemplate
	// FieldTemplate: MyFieldTemplate
	ObjectFieldTemplate: MyObjectFieldTemplate,
	// TitleFieldTemplate: MyTitleFieldTemplate
	// UnsupportedFieldTemplate: MyUnsupportedFieldTemplate
	// WrapIfAdditionalTemplate: MyWrapIfAdditionalTemplate
	// Custom
};

// const {
// 	CheckboxesWidget,
// 	CheckboxWidget,
// 	RadioWidget,
// 	RangeWidget,
// 	SelectWidget,
// 	TextareaWidget,
// } = Widgets;

const MyMultiSelectSchema = z.object({
	type: z.literal("array"),
	items: z.object({
		type: z.literal("string"),
		enum: z.array(z.string()),
	}),
});

const MyMultiSelectWidget = (
	props: WidgetProps<any, StrictRJSFSchema, any>,
) => {
	const { schema: externalSchema, value, onChange, label, id, name } = props;
	const safeParsedSchema = MyMultiSelectSchema.safeParse(externalSchema);

	if (!safeParsedSchema.success) {
		return (
			<div style={{ color: "red" }}>
				<p>{safeParsedSchema.error.name}</p>
				<pre>{safeParsedSchema.error.message}</pre>
			</div>
		);
	}

	const schema = safeParsedSchema.data;
	const options = schema.items.enum;

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { selectedOptions } = e.target;
		const newValue = [...selectedOptions].map((option) => option.value);
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
	// Default
	// CheckboxesWidget: MyCheckboxesWidget
	// CheckboxWidget: MyCheckboxWidget
	// RadioWidget: MyRadioWidget
	// RangeWidget: MyRangeWidget
	// SelectWidget: MySelectWidget
	// TextareaWidget: MyTextareaWidget
	// Custom
	MyMultiSelectWidget,
	MyTableWidget,
};

const fields = {
	// ArrayField: MyArrayField,
	// ArraySchemaField: MyArraySchemaField,
	// BooleanField: MyBooleanField,
	// DescriptionField: MyDescriptionField,
	// OneOfField: MyOneOfField,
	// AnyOfField: MyAnyOfField,
	// LayoutGridField: MyLayoutGridField,
	// LayoutMultiSchemaField: MyLayoutMultiSchemaField,
	// LayoutHeaderField: MyLayoutHeaderField,
	// NullField: MyNullField,
	// NumberField: MyNumberField,
	// ObjectField: MyObjectField,
	// SchemaField: MySchemaField,
	// StringField: MyStringField,
	// TitleField: MyTitleField,
	// UnsupportedField: MyUnsupportedField,
};

type MatcherFn = (schema: StrictRJSFSchema, key: string) => UiSchema | null;

const buildSchemaProperties = (
	schema: StrictRJSFSchema,
	matcherFn: MatcherFn,
	id: string = "root",
): UiSchema => {
	const result: UiSchema = {};

	const match = matcherFn(schema, id);
	if (match !== null) {
		return match;
	}

	// If schema has properties, recurse into them
	if (typeof schema.properties === "object") {
		for (const [key, value] of Object.entries(schema.properties)) {
			const childResult = buildSchemaProperties(
				value as StrictRJSFSchema,
				matcherFn,
				`${id}.${key}`,
			);
			if (childResult && Object.keys(childResult).length > 0) {
				result[key] = childResult;
			}
		}
	}

	return result;
};

const walkSchemaProperties = (
	schema: StrictRJSFSchema,
	matcherFn: (schema: StrictRJSFSchema, id: string) => void,
) => {
	const recurse = (schema: StrictRJSFSchema, id: string) => {
		if (id !== "root") {
			matcherFn(schema, id);
		}

		// If schema is object and has properties, recurse into them
		if (
			schema.type === "object" &&
			typeof schema.properties === "object" &&
			!Array.isArray(schema.properties)
		) {
			for (const [key, value] of Object.entries(schema.properties)) {
				recurse(value as StrictRJSFSchema, `${id}.properties.${key}`);
			}
		}
	};

	recurse(schema, "root");
};

type JsonValue =
	| string
	| number
	| boolean
	| null
	| { [key: string]: JsonValue }
	| JsonValue[];

const walkFormData = (formData: JsonValue): JsonValue => {
	// Handle null/undefined cases
	if (formData === null) return formData;

	// Handle array case
	if (Array.isArray(formData)) {
		console.log("formData array", formData);
		return formData.map((item) => {
			// If array item is an object and has custom_id, remove it
			// if (typeof item === "object" && item !== null) {
			// 	const { custom_id, ...rest } = item as Record<string, JsonValue>;
			// 	return walkFormData(rest);
			// }
			return walkFormData(item);
		});
	}

	// Handle object case
	if (typeof formData === "object" && !Array.isArray(formData)) {
		const result: Record<string, JsonValue> = {};
		for (const [key, value] of Object.entries(formData)) {
			result[key] = walkFormData(value);
		}
		return result;
	}

	// Handle primitive values
	return formData;
};

// NOTE: defaultFormData overrides default values set in schema
const defaultFormData = {};

type Props = {
	// Form
	schema: FormProps["schema"];
	uiSchema?: FormProps["uiSchema"];
	formData?: FormProps["formData"];
	onChange?: FormProps["onChange"];
	onSubmit?: FormProps["onSubmit"];
	// Custom
};

export const MyForm = ({
	// Form
	schema,
	uiSchema: externalUiSchema,
	formData: externalFormData,
	onChange,
	onSubmit,
	// Custom
}: Props) => {
	const formRef = useRef<FormType>(null);
	const [formData, setFormData] = useState(null);

	useEffect(() => {
		validator.reset();
	}, []);

	const builtUiSchema = useMemo(() => {
		const matcherFn: MatcherFn = (schema, _key) => {
			if (schema.meta?.hidden === true) {
				return { "ui:widget": "hidden" };
			}

			if (schema.type === "array" && schema.items.type === "object") {
				return { "ui:widget": "MyTableWidget" };
			}

			return null;
		};
		const built = buildSchemaProperties(schema, matcherFn);

		const merged = merge({}, built, externalUiSchema);
		return merged;
	}, [schema, externalUiSchema]);

	const formContext = {};

	const handleChange: FormProps["onChange"] = (data, id) => {
		console.log("changed", data.formData);
		if (!externalFormData) setFormData(data.formData);
		onChange?.(data, id);
	};

	const handleProgramaticSubmit = () => {
		if (!formRef.current) return;

		const formDataToValidate = walkFormData(externalFormData || formData);

		if (
			formDataToValidate
				? formRef.current.validateFormWithFormData(formDataToValidate)
				: formRef.current.validateForm()
		) {
			formRef.current.submit();
		}
	};

	const handleSubmit: FormProps["onSubmit"] = (data, event) => {
		console.log("submitted", data.formData);
		onSubmit?.(data, event);
	};

	return (
		<Form
			ref={formRef}
			schema={schema}
			validator={validator}
			uiSchema={builtUiSchema}
			widgets={widgets}
			templates={templates}
			formData={externalFormData || formData}
			onChange={handleChange} // By default Form is uncontrolled, assign formData and onChange to make it controlled
			onSubmit={handleSubmit}
			onError={(errors) => console.log("errors", errors)}
			noHtml5Validate // This disables the "Please fill out this field." html validation
			idSeparator="."
			formContext={formContext}
			experimental_defaultFormStateBehavior={{
				constAsDefaults: "always",
				emptyObjectFields: "skipEmptyDefaults",
				allOf: "populateDefaults",
			}}
			// extraErrors={builder.ErrorSchema}
			// extraErrorsBlockSubmit
		>
			<button type="button" onClick={handleProgramaticSubmit}>
				Submit
			</button>
		</Form>
	);
};

// TODO
const builder = new ErrorSchemaBuilder();
builder.addErrors(
	["Custom error on string_field", "test"],
	"root.my_table_widget",
);

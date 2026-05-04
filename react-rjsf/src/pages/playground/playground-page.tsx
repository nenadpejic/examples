import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import { type MouseEvent, useState } from "react";
import { MyEditor } from "../../components/ui/my-editor/my-editor";
import { MyForm } from "../../components/ui/my-form/my-form";
import arrayType from "./samples/array_type.json";
import booleanType from "./samples/boolean_type.json";
import numberType from "./samples/number_type.json";
import objectType from "./samples/object_type.json";
import stringType from "./samples/string_type.json";

const sampleNameToSampleMap = {
	stringType,
	numberType,
	booleanType,
	arrayType,
	objectType,
};

type SampleName = keyof typeof sampleNameToSampleMap;

const buttons = Object.keys(sampleNameToSampleMap) as SampleName[];

const toJson = (val: unknown) => JSON.stringify(val, null, 2);

export const PlaygroundPage = () => {
	const [selectedSampleName, setSelectedSampleName] = useState(buttons[0]);
	const [jsonSchema, setJsonSchema] = useState<RJSFSchema>(
		sampleNameToSampleMap[selectedSampleName].jsonSchema,
	);
	const [uiSchema, setUiSchema] = useState<UiSchema>(
		sampleNameToSampleMap[selectedSampleName].uiSchema,
	);
	const [formData, setFormData] = useState<any>(null);

	const handleSampleSelect = (e: MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value as SampleName;
		setSelectedSampleName(value);
		setFormData({});
		setJsonSchema(sampleNameToSampleMap[value].jsonSchema);
		setUiSchema(sampleNameToSampleMap[value].uiSchema);
	};

	return (
		<div>
			<div style={{ display: "flex", gap: 8 }}>
				{buttons.map((button) => (
					<button
						key={button}
						type="button"
						value={button}
						onClick={handleSampleSelect}
					>
						{button}
					</button>
				))}
			</div>

			<div style={{ borderBottom: "1px solid lightgray", margin: "8px 0" }} />

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(12, 1fr)",
					gap: 16,
				}}
			>
				<div style={{ gridColumn: "span 7" }}>
					<MyEditor
						title="JSONSchema"
						code={toJson(jsonSchema)}
						onChange={setJsonSchema}
					/>

					<div
						style={{
							marginTop: 16,
							display: "grid",
							gridTemplateColumns: "repeat(12, 1fr)",
							gap: 16,
						}}
					>
						<div style={{ gridColumn: "span 6" }}>
							<MyEditor
								title="UiSchema"
								code={toJson(uiSchema)}
								onChange={setUiSchema}
							/>
						</div>
						<div style={{ gridColumn: "span 6" }}>
							<MyEditor
								title="formData"
								code={toJson(formData)}
								onChange={setFormData}
							/>
						</div>
					</div>
				</div>

				<div style={{ gridColumn: "span 5" }}>
					<MyForm
						schema={jsonSchema}
						uiSchema={uiSchema}
						formData={formData}
						onChange={(data) => setFormData(data.formData)}
					/>
				</div>
			</div>
		</div>
	);
};

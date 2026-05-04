import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import {
	DataGrid,
	GridActionsCellItem,
	type GridColDef,
	type GridEventListener,
	GridRowEditStopReasons,
	type GridRowId,
	type GridRowModel,
	GridRowModes,
	type GridRowModesModel,
	type GridSlotProps,
	Toolbar,
	ToolbarButton,
} from "@mui/x-data-grid";
import type { WidgetProps } from "@rjsf/utils";
import { omit } from "lodash";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";

declare module "@mui/x-data-grid" {
	interface ToolbarPropsOverrides {
		// setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
		rows: Row[];
		onChange: WidgetProps["onChange"];
		setRowModesModel: (
			newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
		) => void;
	}
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
	const { rows, onChange, setRowModesModel } = props;

	const handleAddRow = () => {
		const custom_id = nanoid();

		onChange([...rows, { custom_id, isNew: true }]);
		// setRows((oldRows) => {
		// 	return [...oldRows, { custom_id, isNew: true }];
		// });
		setRowModesModel((oldModel) => ({
			...oldModel,
			[custom_id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		}));
	};

	return (
		<Toolbar>
			<Tooltip title="Add record">
				<ToolbarButton onClick={handleAddRow}>
					<AddIcon fontSize="small" />
				</ToolbarButton>
			</Tooltip>
		</Toolbar>
	);
}

const setIds = (data: any) => {
	return data?.map((item: Record<string, any>) => {
		if (item.custom_id) return item;
		return { ...item, custom_id: nanoid() };
	});
};

type Row = {
	custom_id: string;
	isNew?: boolean;
	// [key: string]: any;
};

export const MyTableWidget = (props: WidgetProps) => {
	const { value, onChange, label, schema, rawErrors } = props;
	console.log({ props });
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	const rows: Row[] = useMemo(() => {
		return setIds(value);
	}, [value]);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (
		params,
		event,
	) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		onChange(rows.filter((row) => row.custom_id !== id));
		// setRows(rows.filter((row) => row.custom_id !== id));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.custom_id === id);
		if (editedRow?.isNew) {
			onChange(rows.filter((row) => row.custom_id !== id));
			// setRows(rows.filter((row) => row.custom_id !== id));
		}
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = omit(newRow, ["isNew"]);

		onChange(
			rows.map((row) => {
				return row.custom_id === newRow.custom_id ? updatedRow : row;
			}),
		);
		// setRows(
		// 	rows.map((row) =>
		// 		row.custom_id === newRow.custom_id ? updatedRow : row,
		// 	),
		// );
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = Object.entries(schema.items.properties).map(
		([key, value]) => {
			const { type, title, readOnly } = value;

			return {
				field: key,
				headerName: title || key,
				// width: 180,
				editable: !readOnly,
				type: type === "integer" ? "number" : type,
			};
		},
	);

	const actionColumn: GridColDef = {
		field: "actions",
		type: "actions",
		headerName: "Actions",
		width: 100,
		cellClassName: "actions",
		getActions: ({ id }) => {
			const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

			if (isInEditMode) {
				return [
					<GridActionsCellItem
						key={`save-${id}`}
						icon={<SaveIcon />}
						label="Save"
						material={{
							sx: {
								color: "primary.main",
							},
						}}
						onClick={handleSaveClick(id)}
					/>,
					<GridActionsCellItem
						key={`cancel-${id}`}
						icon={<CancelIcon />}
						label="Cancel"
						className="textPrimary"
						onClick={handleCancelClick(id)}
						color="inherit"
					/>,
				];
			}

			return [
				<GridActionsCellItem
					key={`edit-${id}`}
					icon={<EditIcon />}
					label="Edit"
					className="textPrimary"
					onClick={handleEditClick(id)}
					color="inherit"
				/>,
				<GridActionsCellItem
					key={`delete-${id}`}
					icon={<DeleteIcon />}
					label="Delete"
					onClick={handleDeleteClick(id)}
					color="inherit"
				/>,
			];
		},
	};

	columns.push(actionColumn);

	return (
		<Box>
			<Typography sx={{ mb: 1 }} variant="body1">
				{label}
			</Typography>
			<Box
				sx={{
					// height: 500,
					width: "100%",
					"& .actions": {
						color: "text.secondary",
					},
					"& .textPrimary": {
						color: "text.primary",
					},
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					slots={{ toolbar: EditToolbar }}
					slotProps={{
						toolbar: {
							rows,
							onChange,
							setRowModesModel,
						},
					}}
					showToolbar
					getRowId={(row) => row.custom_id}
				/>
			</Box>
		</Box>
	);
};

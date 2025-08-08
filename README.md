## Package Structure

This repository contains two separate npm packages:

### 1. `csv-upload`

A set of reusable React components to upload, validate, view, and interact with tabular CSV data. It supports inline editing, error messaging, and a fully customizable validation pipeline.

### 2. `dsl-validator`

A utility module that allows users to define field-level validation rules and type constraints for CSV data using a declarative schema DSL.

### 3. `types`
This package provides shared TypeScript types and interfaces used internally across the `csv-upload` and `dsl-validator` packages. These definitions ensure consistent typing for cell data, validation errors, and socket communication.
---

## DSL Validator: Schema Definition

### CSVFieldBase

Common properties shared across all field types:

| Field              | Type                                | Description                                                            |
| ------------------ | ----------------------------------- | ---------------------------------------------------------------------- |
| `name`             | `string`                            | Name of the field (matches column header)                              |
| `required`         | `boolean` (optional)                | Whether this field is required                                         |
| `validator`        | `(value: string) => string \| null` | Custom validator function. Return `null` if valid, or an error message |
| `errorMsg`         | `string` (optional)                 | Custom error message (used if validator fails)                         |
| `allowWhiteSpaces` | `boolean` (optional)                | Allow whitespaces in field value                                       |

### CSVFieldStringSchema

| Field     | Type       | Description                            |
| --------- | ---------- | -------------------------------------- |
| `type`    | `'string'` | Declares the type as string            |
| `options` | `string[]` | Optional. Allowed set of string values |

### CSVFieldNumberSchema

| Field  | Type       | Description                     |
| ------ | ---------- | ------------------------------- |
| `type` | `'number'` | Declares the type as number     |
| `min`  | `number` (optional)   | Minimum allowed value |
| `max`  | `number` (optional)  | Maximum allowed value |

### CSVFieldBooleanSchema

| Field  | Type        | Description                  |
| ------ | ----------- | ---------------------------- |
| `type` | `'boolean'` | Declares the type as boolean |

### CSVFieldDateSchema

| Field         | Type              | Description                   |
| ------------- | ----------------- | ----------------------------- |
| `type`        | `'date'`          | Declares the type as date     |
| `dateFormats` | `CSVDateFormat[]` | List of accepted date formats |

### `CSVDateFormat` type:
```ts
  "yyyy-MM-dd" | "dd-MM-yyyy" | "MM-dd-yyyy" |
  "yyyy/MM/dd" | "dd/MM/yyyy" | "MM/dd/yyyy" |
  "yyyy.MM.dd" | "dd MMMM yyyy" | "MMMM dd, yyyy" |
  "MMMM dd,yyyy" | "MMM dd, yyyy" | "MMM dd,yyyy" |
  "dd.MM.yyyy" | "dd MMM yyyy";
```
### CSVSchema

| Field     | Type               | Description                                |
| --------- | ------------------ | ------------------------------------------ |
| `fields`  | `CSVFieldSchema[]` | Array of field definitions (see above)     |
| `headers` | `boolean`          | Whether the CSV file includes a header row |

### Example Usage

```ts
const schema: CSVSchema = {
  fields: [
    { name: "Countries", type: "string" },
    { name: "Currency", type: "string" },
    { name: "Price", type: "number", allowWhiteSpaces: true },
    { name: "Adjust", type: "string", options: ["Y", "N"], required: true }
  ],
  headers: true
};
```

---

## Components (from `csv-upload`)

### Provider

| Prop            | Type                      | Description                              |
| --------------- | ------------------------- | ---------------------------------------- |
| `schema`        | `CSVSchema`               | Schema used to validate the CSV fields   |
| `data`          | `string[][]` (optional)   | Initial table data (rows)                |
| `errors`        | `CSVError[]` (optional)   | Initial set of errors to load            |
| `onUploadClick` | `(rows, lastRow) => void` | Callback for upload button               |
| `children`      | `ReactNode`               | Child components inside provider context |

### AddCSVButton

| Prop        | Type        | Description        |
| ----------- | ----------- | ------------------ |
| `children`  | `ReactNode` | Button content     |
| `className` | `string`    | Optional CSS class |

### UploadButton

| Prop        | Type        | Description        |
| ----------- | ----------- | ------------------ |
| `children`  | `ReactNode` | Button content     |
| `className` | `string`    | Optional CSS class |

### ErrorCount

| Prop        | Type     | Description        |
| ----------- | -------- | ------------------ |
| `className` | `string` | Optional CSS class |

### JumpToFirstError

| Prop        | Type        | Description        |
| ----------- | ----------- | ------------------ |
| `children`  | `ReactNode` | Button content     |
| `className` | `string`    | Optional CSS class |

### ErrorMessage

| Prop        | Type     | Description        |
| ----------- | -------- | ------------------ |
| `className` | `string` | Optional CSS class |

### Header

| Prop        | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `className` | `string` | Optional CSS class for headers |

### Cell

| Prop         | Type        | Description                 |
| ------------ | ----------- | --------------------------- |
| `children`   | `ReactNode` | Content of the cell         |
| `classNames` | `object`    | Custom styles per cell type |

#### `classNames` object:

* `cell`: Styles for normal cell
* `errorCell`: Styles when cell has error
* `text`: Inner content text styles
* `errorText`: Text styles when error is present

### DisplayCell

| Prop         | Type     | Description                     |
| ------------ | -------- | ------------------------------- |
| `classNames` | `object` | Styling hooks for display cells |

#### `classNames` object:

* `cell`: Cell container style
* `errorCell`: Style when error exists
* `text`: Normal text style
* `errorText`: Text style on error

### InputCell

| Prop         | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| `classNames` | `object` | Styling hooks for input cells |

#### `classNames` object:

* `cell`: Cell wrapper
* `errorCell`: Cell when error
* `input`: Input field styles
* `errorInput`: Style for error input

### Table

| Prop         | Type                | Description                              |
| ------------ | ------------------- | ---------------------------------------- |
| `columns`    | `Column[]`          | Column definitions with render functions |
| `classNames` | `object` (optional) | Table layout classes                     |

#### `classNames` object:

* `table`: Main table
* `head`: Header row
* `body`: Body rows

### Column Object (for `<Table />`)

| Prop             | Type        | Description                            |
| ---------------- | ----------- | -------------------------------------- |
| `name`           | `string`    | Column key (matches schema field name) |
| `renderHeader`   | `ReactNode` | Optional custom header                 |
| `renderCell`     | `ReactNode` | Cell rendering logic                   |
| `renderErrorBox` | `ReactNode` | Custom error message renderer          |

### Example Usage

```ts
  const columns: Column[] = schema.fields.map((field) => ({
    name: field.name,
    renderHeader: <Header />,
    renderCell: <Cell/>,
    renderErrorBox: <ErrorMessage />
  }))

  return (
    <Provider schema={schema} errors={errors} onUploadClick={onUploadClick}>
      <AddCSVButton> Add CSV </AddCSVButton>
      <UploadButton> Upload </UploadButton>
      <ErrorCount />
      <JumpToFirstError> Jump to error </JumpToFirstError>

      <Table columns={columns}/>
    </Provider>

  );
```

# Types

### `CSVCellCoords`

```ts
{ row: number, col: number }
```

Represents the coordinates of a cell in the CSV matrix.

### `CSVCellType`

```ts
"display" | "input"
```

Defines whether the cell is for display only or editable.

### `CSVErrorType`

```ts
"frontend" | "backend"
```

Classifies whether an error originates from frontend or backend validation.

### `CSVError`

```ts
interface CSVError {
  coords: CSVCellCoords,
  msg: string,
  type: CSVErrorType
}
```

Represents a validation error tied to a specific cell.

* `coords`: The cell where the error occurred.
* `msg`: Description of the error.
* `type`: Source of the error.

### `ErrorMsg`

```ts
string | null
```

Nullable error message type used to represent optional validation output.

### `CSVSocketData`

```ts
interface CSVSocketData {
  batchSize: number,
  startIndex: number,
  rows: string[][]
}
```

Used to send a batch of CSV data to the backend over a socket.

* `batchSize`: Number of rows being sent.
* `startIndex`: Index in the full CSV where the batch begins.
* `rows`: 2D array of raw cell values.

### `CSVSocketError`

```ts
interface CSVSocketError {
  startIndex: number,
  errors: CSVError[]
}
```

Used to return validation errors from the backend for a specific batch.

* `startIndex`: Index of the first row in the batch.
* `errors`: Array of error objects corresponding to cells.

---

## Usage

This package is primarily intended for internal consumption within the project's ecosystem. However, it can also be useful for:

* Type-safe UI layer development
* Socket message typing
* Debugging and test utilities

If you're contributing to or extending `csv-upload` or `dsl-validator`, this package ensures consistent typing across shared modules.

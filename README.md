The Data Validation package suite provides a modular and extensible toolkit for importing, validating, and interacting with CSV data in web applications. It consists of three independently published npm packages — csv-upload, dsl-validator, and types — designed to work together seamlessly for defining schema constraints, building CSV upload UIs, and enforcing type-safe validation logic. Whether you're handling frontend error messaging or backend validation pipelines, this suite offers a complete system for CSV-based data workflows

## Package Structure

This repository contains three separate npm packages:

### 1. `csv-upload`

A set of reusable React components to upload, validate, view, and interact with tabular CSV data. It supports inline editing, error messaging, and a fully customizable validation pipeline.

### 2. `dsl-validator`

A utility module that allows users to define field-level validation rules and type constraints for CSV data using a declarative schema DSL.

### 3. `types`
This package provides shared TypeScript types and interfaces used internally across the `csv-upload` and `dsl-validator` packages. These definitions ensure consistent typing for cell data, validation errors, and socket communication.

## DSL Validator: Schema Definition

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
### Fields
#### CSVFieldBase

Common properties shared across all field types:

| Field              | Type                                | Description                                                            |
| ------------------ | ----------------------------------- | ---------------------------------------------------------------------- |
| `name`             | `string`                            | Name of the field (matches column header)                              |
| `required`         | `boolean` (optional)                | Whether this field is required                                         |
| `validator`        | `(value: string) => string \| null` | Custom validator function. Return `null` if valid, or an error message |
| `errorMsg`         | `string` (optional)                 | Custom error message (used if validator fails)                         |
| `allowWhiteSpaces` | `boolean` (optional)                | Allow whitespaces in field value                                       |

#### CSVFieldStringSchema
Defines a string field and optionally restricts values to a given set.

| Field     | Type       | Description                            |
| --------- | ---------- | -------------------------------------- |
| `type`    | `'string'` | Declares the type as string            |
| `options` | `string[]` (optional) | Allowed set of string values |

#### CSVFieldNumberSchema
Defines a numeric field with optional min and max constraints.

| Field  | Type                | Description                 |
| ------ | ------------------- | --------------------------- |
| `type` | `'number'`          | Declares the type as number |
| `min`  | `number` (optional) | Minimum allowed value       |
| `max`  | `number` (optional) | Maximum allowed value       |

#### CSVFieldBooleanSchema
Defines a boolean field (typically `true` or `false`).

| Field  | Type        | Description                  |
| ------ | ----------- | ---------------------------- |
| `type` | `'boolean'` | Declares the type as boolean |

#### CSVFieldDateSchema
Defines a date field with a set of allowed string date formats.

| Field         | Type              | Description                   |
| ------------- | ----------------- | ----------------------------- |
| `type`        | `'date'`          | Declares the type as date     |
| `dateFormats` | `CSVDateFormat[]` | List of accepted date formats |

##### `CSVDateFormat` type:
```ts
  "yyyy-MM-dd" | "dd-MM-yyyy" | "MM-dd-yyyy" |
  "yyyy/MM/dd" | "dd/MM/yyyy" | "MM/dd/yyyy" |
  "yyyy.MM.dd" | "dd MMMM yyyy" | "MMMM dd, yyyy" |
  "MMMM dd,yyyy" | "MMM dd, yyyy" | "MMM dd,yyyy" |
  "dd.MM.yyyy" | "dd MMM yyyy";
```

#### CSVSchema
Top-level schema definition combining multiple field types and indicating whether the CSV includes headers.

| Field     | Type               | Description                                |
| --------- | ------------------ | ------------------------------------------ |
| `fields`  | `CSVFieldSchema[]` | Array of field definitions (see above)     |
| `headers` | `boolean`          | Whether the CSV file includes a header row |

---

## CSV Upload
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

### Components
#### Provider
Provides context for CSV data, schema, and error management.

| Prop            | Type                      | Description                              |
| --------------- | ------------------------- | ---------------------------------------- |
| `schema`        | `CSVSchema`               | Schema used to validate the CSV fields   |
| `data`          | `string[][]` (optional)   | Initial table data (rows)                |
| `errors`        | `CSVError[]` (optional)   | Initial set of errors to load            |
| `onUploadClick` | `(rows, lastRow) => void` | Callback for upload button               |
| `children`      | `ReactNode`               | Child components inside provider context |

#### AddCSVButton
Renders a button to upload CSV files into the app.

| Prop        | Type                | Description    |
| ----------- | ------------------- | -------------- |
| `children`  | `ReactNode`         | Button content |
| `className` | `string` (optional) | CSS class      |

#### UploadButton

A generic upload button that triggers an upload action.

| Prop        | Type                | Description    |
| ----------- | ------------------- | -------------- |
| `children`  | `ReactNode`         | Button content |
| `className` | `string` (optional) | CSS class      |

#### ErrorCount

Displays the number of errors in the current CSV data.

| Prop        | Type                | Description |
| ----------- | ------------------- | ----------- |
| `className` | `string` (optional) | CSS class   |

#### JumpToFirstError

A control to automatically scroll to the first error cell.

| Prop        | Type                | Description    |
| ----------- | ------------------- | -------------- |
| `children`  | `ReactNode`         | Button content |
| `className` | `string` (optional) | CSS class      |

#### ErrorMessage

Displays an error message related to a cell.

| Prop        | Type                | Description |
| ----------- | ------------------- | ----------- |
| `className` | `string` (optional) | CSS class   |

#### Header
Renders the table header row.

| Prop        | Type                | Description           |
| ----------- | ------------------- | --------------------- |
| `className` | `string` (optional) | CSS class for headers |

#### Cell
Generic table cell renderer with styling for both input and display types.

| Prop         | Type                | Description                 |
| ------------ | ------------------- | --------------------------- |
| `classNames` | `object` (optional) | Custom styles per cell type |

##### `classNames` object:

* `cell`: Optional styles for normal cell
* `errorCell`: Optional styles when cell has error
* `text`: Optional inner content text styles
* `errorText`: Optional styles when error is present

### DisplayCell

Renders read-only cell values.

| Prop         | Type                | Description                     |
| ------------ | ------------------- | ------------------------------- |
| `classNames` | `object` (optional) | Styling hooks for display cells |

#### `classNames` object:

* `cell`: Optional styles for display cell
* `errorCell`: Optional styles when cell has error
* `text`: Optional inner content text styles
* `errorText`: Optional styles when error is present

### InputCell

Editable cell component for accepting user input.

| Prop         | Type                | Description                   |
| ------------ | ------------------- | ----------------------------- |
| `classNames` | `object` (optional) | Styling hooks for input cells |

#### `classNames` object:

* `cell`: Optional styles for display cell
* `errorCell`: Optional styles when cell has error
* `text`: Optional Input styles
* `errorText`: Optional styles when error is present

### Table

Main table renderer that accepts custom column configuration.

| Prop         | Type                | Description                              |
| ------------ | ------------------- | ---------------------------------------- |
| `columns`    | `Column[]`          | Column definitions with render functions |
| `classNames` | `object` (optional) | Table layout classes                     |

#### `classNames` object:

* `table`: Optional main table style
* `head`: Optional header row style
* `body`: Optional body style

#### Column Object (for `<Table />`)
Defines rendering logic and metadata for each column.

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

## Types

#### CSVCellCoords

```ts
{ row: number, col: number }
```

Represents the coordinates of a cell in the CSV matrix.

#### CSVCellType

```ts
"display" | "input"
```

Defines whether the cell is for display only or editable.

#### CSVErrorType

```ts
"frontend" | "backend"
```

Classifies whether an error originates from frontend or backend validation.

#### CSVError

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

#### ErrorMsg

```ts
string | null
```

Nullable error message type used to represent optional validation output.

#### CSVSocketData

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

#### CSVSocketError

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

### Usage

This package is primarily intended for internal consumption within the project's ecosystem. However, it can also be useful for:

* Type-safe UI layer development
* Socket message typing
* Debugging and test utilities

If you're contributing to or extending `csv-upload` or `dsl-validator`, this package ensures consistent typing across shared modules.

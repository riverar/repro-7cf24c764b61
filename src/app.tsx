import {
    makeStyles,
    shorthands,
    DataGridHeaderCell,
    DataGridBody,
    DataGridCell,
    DataGridHeader,
    DataGridRow,
    DataGrid,
    TableColumnDefinition,
    TableCellLayout,
    createTableColumn,
} from '@fluentui/react-components';

const useStyles = makeStyles({
    root: {
        fontSize: '16px',
        maxWidth: '1024px',
        ...shorthands.margin('1em'),
    }
});

export type ReproItem = {
    name: string;
    value: number;
}

const columns: TableColumnDefinition<ReproItem>[] = [
    createTableColumn<ReproItem>({
        columnId: 'name',
        compare: (a, b) => a.name.localeCompare(b.name),
        renderCell: (result) => {
            return (
                <TableCellLayout>
                    <span>{result.name}</span>
                </TableCellLayout>
            );
        },
        renderHeaderCell: () => {
            return 'Name';
        },
    }),
    createTableColumn<ReproItem>({
        columnId: 'value',
        compare: (a, b) =>
            JSON.stringify(a.value).localeCompare(
                JSON.stringify(b.value)
            ),
        renderCell: (result) => {
            return (
                <span>{result.value}</span>
            );
        },
        renderHeaderCell: () => {
            return 'Value';
        },
    }),
];

function App() {
    const styles = useStyles();
    const reproItems : ReproItem[] = [
        {
            name: 'foo',
            value: 42
        },
        {
            name: 'baz',
            value: 24
        },
    ];

    return (
        <div className={styles.root}>
            <DataGrid
                items={reproItems}
                columns={columns}
                focusMode='none'
                size='medium'
                resizableColumns
                columnSizingOptions={{
                    name: {
                        minWidth: 100,
                    },
                    value: {
                        minWidth: 200,
                        idealWidth: 800,
                    },
                }}
            >
                <DataGridHeader>
                    <DataGridRow>
                        {(col) => {
                            return (
                                <DataGridHeaderCell key={col.columnId}>
                                    {col.columnId}
                                </DataGridHeaderCell>
                            );
                        }}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<ReproItem>>
                    {({ item, rowId }) => {
                        return (
                            <DataGridRow
                                key={rowId}
                                style={{
                                    paddingTop: '1em',
                                    paddingBottom: '1em',
                                }}
                            >
                                {(col) => (
                                    <DataGridCell>
                                        {col.renderCell(item)}
                                    </DataGridCell>
                                )}
                            </DataGridRow>
                        );
                    }}
                </DataGridBody>
            </DataGrid>
        </div>
    );
}

export default App;

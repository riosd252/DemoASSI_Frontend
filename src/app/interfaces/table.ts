export interface Table {
  id: number;
  tableNumber: string;
  capacity: number;
  occupiedSeats: number;
  freeSeats: number;
  status: string;
}

export interface ModifiedTable {
  tableNum: string;
  capacity: number;
}

export function assignTable(
  numPeople: number,
  tables: Table[]
): Table | Table[] {
  let preciseTable: Table | undefined = tryPreciseTable(numPeople, tables);
  if (preciseTable) return preciseTable;

  let partiallyOccupied: Table | undefined = tryPartiallyOccupied(
    numPeople,
    tables
  );
  if (partiallyOccupied) return partiallyOccupied;

  let splitTables: Table[] = trySplitting(numPeople, tables);
  return splitTables;
}

function tryPreciseTable(
  numPeople: number,
  tables: Table[]
): Table | undefined {
  return tables.find(
    (table) => table.capacity === numPeople && table.status === 'FREE'
  );
}

function tryPartiallyOccupied(
  numPeople: number,
  tables: Table[]
): Table | undefined {
  const sortedTables = tables.slice().sort((a, b) => a.freeSeats - b.freeSeats);

  return sortedTables.find((table) => table.freeSeats >= numPeople);
}

function trySplitting(numPeople: number, tables: Table[]): Table[] {
  const sortedTables = tables.slice().sort((a, b) => b.freeSeats - a.freeSeats);

  let suitableTables: Table[] = [];
  let peopleLeft = numPeople;

  for (let i = 0; i < sortedTables.length; i++) {
    const table = sortedTables[i];

    if (peopleLeft > 0) {
      const seatsToTake = Math.min(table.freeSeats, peopleLeft);
      suitableTables.push(table);
      peopleLeft -= seatsToTake;
    } else {
      break;
    }
  }

  return suitableTables;
}

//es. ricorsione
function fib(n: number): number {
  switch (n) {
    case 0:
      return 1;
    case 1:
      return 2;
  }
  return fib(n - 1) + fib(n - 2);
}

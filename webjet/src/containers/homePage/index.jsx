import React from 'react';
import { connect } from 'react-redux';
import {
  filmWorldRequestSuccess,
  filmWorldRequestFailed
} from './homePage.actions';
import { getFilmMaker } from '../../api/filmmaker';

import styled from 'styled-components';
import { useTable } from 'react-table';
// import './styles.css';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

class HomePage extends React.Component {
  async componentDidMount() {
    const result = await getFilmMaker();
    console.log('result    ', result);
    if (result.response.status === 200)
      this.props.filmWorldRequestSuccess(result.response.data.data);
    else this.props.filmWorldRequestFailed(result.response);
  }

  render() {
    const { filmWorldData } = this.props;
    const columns = [
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Owner',
        accessor: 'owner'
      },
      {
        Header: 'Charges',
        accessor: 'charges'
      },
      {
        Header: 'Broadcaster',
        accessor: 'broadcaster'
      },
      {
        Header: 'Description',
        accessor: 'description'
      }
    ];

    return (
      <Styles>
        <Table columns={columns} data={filmWorldData} />
      </Styles>
      // <div>
      //   <ReactTable instance />
      // </div>
      // <div className="TileContainer">
      //   {filmWorldData &&
      //     filmWorldData.map((filmWorld, index) => {
      //       return (
      //         <div className="Tiles" key={index}>
      //           {filmWorld.title}
      //           {filmWorld.charges}
      //           {filmWorld.description}
      //           {filmWorld.owner}
      //         </div>
      //       );
      //     })}
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filmWorldData: state.filmWorld
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filmWorldRequestSuccess: success => {
      dispatch(filmWorldRequestSuccess(success));
    },
    filmWorldRequestFailed: error => {
      dispatch(filmWorldRequestFailed(error));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

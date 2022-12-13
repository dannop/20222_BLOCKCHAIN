import { Dropdown } from "react-bootstrap";
import DataTable, { TableProps } from "react-data-table-component";
import ReactPaginate from 'react-paginate';
import DefaultBtn from "../default-btn";
import SelectInput from "../forms/select-input";

import { ArrowDropDown, FilterAlt } from "../icons";
import SearchBar from "../search-bar";

import './style.scss';

interface DefaultDataTableProps extends TableProps<any> {
  currentPage: number,
  onPageChange: (selectedItem: { selected: number; }) => void,
  totalPages?: number,
  className?: string,
  searchFilterPlaceholder?: string,
  onChangePerPage?: (value: any) => void,
  onSearch?: (value: string) => void,
  onFilter?: (value: any) => void
}

const DefaultDataTable = (props: DefaultDataTableProps) => {
    const { currentPage, paginationPerPage, totalPages, searchFilterPlaceholder, className, onRowClicked, ...dataTable_props } = props;

    const { onPageChange, onChangePerPage, onSearch, onFilter } = props;

    const perPageOptions = [
      {label: '5', value: 5},
      {label: '10', value: 10},
      {label: '20', value: 20},
      {label: '50', value: 50},
    ]

    const CustomPagination = () => (
      <div className="react-dataTable-footer px-md py-sm d-flex flex-row-reverse align-items-center justify-content-between">
        {onPageChange && (
          <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage - 1}
            onPageChange={onPageChange}
            pageCount={totalPages || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
          />
        )}
        {onChangePerPage && (
          <div className="per-page-select-group d-flex align-items-center">
            <label htmlFor="perPage" className="body-sm text-black mr-xsm">Resultado por página</label>
            <SelectInput 
              id="perPage"
              name="perPage"
              value={perPageOptions.find(option => option.value === paginationPerPage)}
              options={perPageOptions}
              onChange={onChangePerPage}
            />
          </div>
        )}
      </div>
    )

    console.log(onPageChange !== undefined || onChangePerPage !== undefined)
    
    return (
      <div className={`react-dataTable${className ? ` ${className}` : ''}${onRowClicked ? ' clickableRow' : ''}${(onSearch !== undefined || onFilter !== undefined) ? '' : ' no-before-table'}${(totalPages !== undefined || onChangePerPage !== undefined) ? '' : ' no-after-table'}`}>
        {(onSearch || onFilter) && (
          <div className="react-dataTable-filters-header d-flex align-items-center justify-content-between">
              {onSearch && (
                <div className="col-5">
                  <SearchBar 
                    onSearch={onSearch} 
                    placeholder={
                      searchFilterPlaceholder 
                        ? searchFilterPlaceholder 
                        : "Pesquisar"
                    }
                  />
                </div>
              )}
              {onFilter && (
                <div className="flex-grow-1 d-flex align-items-center justify-content-end">
                  <Dropdown className="flex-grow-1 d-flex justify-content-end">
                      <Dropdown.Toggle as={DefaultBtn} className="label-sm default-btn btn-sm primary btn-icon">
                          <FilterAlt size={16}/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          {/* <Dropdown.Item onClick={() => handleEditStorage(local, item)}>Editar</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDeleteLocal(local)} className="text-danger">Apagar...</Dropdown.Item> */}
                      </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
          </div>
        )}
        <DataTable
        // data
        // columns
        // paginationPerPage
        // noDataComponent={
        //     <EmptyDatatable 
        //         title={emptyTitle ? emptyTitle : "Não há dados a serem exibidos!"} 
        //         description={emptyDescription}
        //         columns={columns} 
        //     />
        // }
        // selectableRows
        // selectableRowsComponent
        // conditionalRowStyles
            noHeader
            pagination={currentPage !== undefined && paginationPerPage !== undefined && totalPages !== undefined}
            paginationServer
            paginationDefaultPage={currentPage + 1}
            paginationComponent={(totalPages !== undefined || onChangePerPage !== undefined) ? CustomPagination : undefined}
            sortIcon={<ArrowDropDown size={10} />}
            onRowClicked={onRowClicked}
            {...dataTable_props}
        />
      </div>
    )
}

DefaultDataTable.defaultProps = {
  currentPage: 1,
  onPageChange: (selectedItem: { selected: number; }) => null,
}

export default DefaultDataTable;
import React,{Component} from 'react';
import {Table} from 'antd';
import { connect } from "react-redux";
import authActions from '../redux/reducer';
import Modify from './components/modify';
import ModalLine from './components/modal';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
    };

    deleteMsg(value) {
        const arr = this.props.dataSource.filter(item => {
            return (
                item.key!==value
            )
        })
        this.props.delete(arr);
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.props.setData(selectedRows);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    showMsg(value) {
        this.props.show(true);
        this.props.showInfo(value);
    }

    modifyLineMsg(value) {
        this.props.showModal(true);
        this.props.showInfo(value);
    }


    render() {
        const columns = [
            {
              title: 'Date',
              dataIndex: 'date',
              width:'20%',
              key: 'date',
              render: (text) => <p>{text}</p>,
            },
            {
              title: 'Memo',
              dataIndex: 'memo',
              width:'20%',
              key: 'memo',
            },
            {
              title: 'Payee',
              dataIndex: 'payee',
              width:'30%',
              key: 'payee',
            },
            {
              title: 'Amount',
              width:'20%',
              key: 'amount',
              dataIndex: 'amount',
              render: (_, record) => (
                <p>
                  ${_}
                </p>
              ),
            },
            {
              title: 'Action',
              width:'10%',
              key: 'action',
              align:'center',
              render: (value,record) => (
                <>
                    <a
                        style={{marginRight:20,color:'red'}}
                        className="fa-solid fa-pen-clip"
                        onClick={() => {this.modifyLineMsg(value)}}
                    ></a>
                    <a
                        style={{marginRight:20}}
                        className="fa-solid fa-book-medical"
                        onClick={() => {this.showMsg(value)}}
                    ></a>
                    <a
                        style={{color:'orange'}}
                        className="fa-solid fa-trash-can"
                        onClick={() => {this.deleteMsg(value.key)}}
                    ></a>
                </>
              ),
            },
          ];
        return (
            <>
                <Table
                    style={{display:this.props.shows?'none':'block'}}
                    rowSelection={{
                    type: 'checkbox',
                    ...this.rowSelection,
                    }}
                    columns={columns}
                    dataSource={this.props.dataSource}
                    pagination={false}
                />
                <Modify style={{display:this.props.shows?'block':'none'}} />
                <ModalLine />
                <p>
                    已选择{this.props.choiseData?.length}
                </p>
            </>
        )
    }
}



const mapStateToProps = (state) => {return {
    shows: state.showModify,
    dataSource: state.data,
    choiseData: state.newArr,
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setData: (Record) => dispatch(authActions.DataRequest(Record)),
        delete: (Record) => dispatch(authActions.DeleteData(Record)),
        show: (Record) => dispatch(authActions.Show(Record)),
        showInfo: (Record) => dispatch(authActions.ShowMsg(Record)),
        showModal: (Record) => dispatch(authActions.ShowModal(Record)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);

// export default App;
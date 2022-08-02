import React,{Component} from 'react';
import {Modal,Form,Input} from 'antd';
import { connect } from "react-redux";
import authActions from '../../redux/reducer';
import './modify.css';
const {Item} = Form;


class App extends Component {
    form = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
          xLength: 15,
          yLength: 5
        };
    };

    componentDidUpdate() {
        this.form.current.setFieldsValue(this.props.ShowInfo)
    console.log(this.props.ShowInfo);
    // console.log(this.props.Data);
    }

    handleOk(e) {
        const value = this.form.current.getFieldsValue()
        const newData = [...this.props.Data];
        const index = newData.findIndex(item => {return item.key === this.props.ShowInfo.key});
        newData.splice(index,1,{...value,key:this.props.ShowInfo.key});
        this.props.resetData(newData);
        this.props.showModal(false);
    }

    handleCancel(e) {
        this.props.showModal(false);
    }

    onFinish(e) {
        this.props.showModal(false);
        console.log(e);
    }

    render() {
        return (
        <Modal title="Basic Modal" visible={this.props.ShowModal} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
            <Form
                
                ref={this.form}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
                // initialValues={this.props.ShowInfo}
                onFinish={this.onFinish.bind(this)}
                autoComplete="off"
            >
                <Item
                    label="Date"
                    name="date"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Date!',
                    },
                    ]}
                >
                    <Input />
                </Item>
                <Item
                    label="Memo"
                    name="memo"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Memo!',
                    },
                    ]}
                >
                    <Input />
                </Item>
                <Item
                    label="Payee"
                    name="payee"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Payee!',
                    },
                    ]}
                >
                    <Input />
                </Item>
                <Item
                    label="Amount"
                    name="amount"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Amount!',
                    },
                    ]}
                >
                    <Input />
                </Item>
            </Form>
        </Modal>
        )
    }
}



const mapStateToProps = (state) => {return {
    Data:state.data,
    ShowModal: state.showModal,
    ShowInfo: state.showMsg,
    CoordinateMsg: state.coordinateMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (Record) => dispatch(authActions.ShowModal(Record)),
        resetData: (Record) => dispatch(authActions.ResetData(Record)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
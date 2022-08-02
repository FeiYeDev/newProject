import React,{Component} from 'react';
import {Input, Button} from 'antd';
import { connect } from "react-redux";
import authActions from '../../redux/reducer';
import Draggable from 'react-draggable';
import './modify.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          xLength: 700,
          yLength: 20,
          test:{},
          transition: `all .01s ease-in .01s`
        };
    };

    componentWillReceiveProps(nextProps) {
      const choise = nextProps.CoordinateMsg.filter(item => {
        return item.key === nextProps.ShowInfo.key
      });
      if(choise.length>0) {
        this.setState({
          xLength:choise[0].xLength,
          yLength:choise[0].yLength,
          test: {transform: `translateX(${choise[0]-90}px) translateY(${choise[0]-25}px)`,transition: this.state.transition},
        })
      }else {
        this.setState({
          xLength:700,
          yLength:20,
          test: {transform: `translateX(${610}px) translateY(${-5}px)`,transition: this.state.transition},
        })
      }
    }


  showMsg() {
    this.props.show(false);
    this.setState({xLength:700,yLength:20})
  }

  setMsg() {
    this.props.show(false);
    this.setState({xLength:700})
    this.setState({yLength:20})
    const index = this.props.CoordinateMsg.findIndex((item) => {return item.key === this.props.ShowInfo.key});
    if(index === -1) {
      this.props.coordinateMsg([...this.props.CoordinateMsg,{key:this.props.ShowInfo.key,...this.state}])
    }else {
      const arr = this.props.CoordinateMsg;
      arr.splice(index,1,{key:this.props.ShowInfo.key,...this.state});
      this.props.coordinateMsg([...arr]);
    }
  }

  handleDrag(e,a) {
    this.setState({
      xLength:a.x,
      yLength:a.y,
      test: {transform: `translateX(${a.x-90}px) translateY(${a.y-25}px)`,transition: this.state.transition},
    })
  }

  setXlength(e) {
    const { value: inputValue } = e.target;
    if(inputValue <= 800 && inputValue >= 90) {
      this.setState({xLength:Number(inputValue)})
    }
  }

  setYlength(e) {
    const { value: inputValue } = e.target;
    if(inputValue <= 220 && inputValue >= 0) {
      this.setState({yLength:Number(inputValue)})
    }
  }


    render() {
        return (
          <div style={this.props.style}>
            <div className='box-base'>
                <Draggable
                  bounds={{left: 90, top: 0, right: 800, bottom: 220}}
                  position={{x:this.state.xLength,y:this.state.yLength}}
                  onDrag={this.handleDrag.bind(this)}
                >
                  <div className='box-move'>
                  </div>
                </Draggable>
                <div className='drag-handler' style={{...this.state.test}}>
                  ${this.props.ShowInfo.amount}
                </div>
            </div>
            <div className='coordinate'>
              <label style={{marginRight:5}}>
                Horizontal:
              </label>
              <Input
                maxLength={5}
                style={{width:100,marginRight:20}}
                value={this.state.xLength}
                onChange={this.setXlength.bind(this)}
                type='number'
              />
              <label style={{marginRight:5}}>
                Vertical:
              </label>
              <Input
                maxLength={5}
                style={{width:100}}
                value={this.state.yLength}
                onChange={this.setYlength.bind(this)}
                type='number'
              />
            </div>
            <div className='coordinate'>
              <Button
                type='primary'
                style={{marginRight:20}}
                onClick={() => {this.showMsg()}}
              >
                Back
              </Button>
              <Button
                type='primary'
                onClick={() => {this.setMsg()}}
              >
                Finish setup
              </Button>
            </div>
          </div>
        )
    }
}



const mapStateToProps = (state) => {return {
    shows: state.showModify,
    ShowInfo: state.showMsg,
    CoordinateMsg: state.coordinateMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
    return {
        show: (Record) => dispatch(authActions.Show(Record)),
        showInfo: (Record) => dispatch(authActions.ShowMsg(Record)),
        coordinateMsg: (Record) => dispatch(authActions.CoordinateMsg(Record)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
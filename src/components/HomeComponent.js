import React from 'react';
import { Card, CardTitle } from 'reactstrap';

function Home(props) { 
  return (
    <div className="container2">
      <div className="row"> <h1>Home</h1></div>
      <div className="row"> <h3>If you do not want to sign up, please login with (guest/123)</h3></div>
      <div className="row"> 
        <div className="col-sm-5">
          <Card style={{ backgroundColor: '#aaaaaa' }}>
            <CardTitle>Dashboard</CardTitle>
            <img src='demo1.png' alt='dashboard' height='500px'/>
          </Card>
        </div>
        <div className="col-sm-5">
          <Card style={{ backgroundColor: '#aaaaaa' }}>
            <CardTitle>Coins</CardTitle>
            <img src='demo2.png' alt='coins' height='500px'/>
          </Card>
        </div>
      </div>
      <div className="row"> 
        <div className="col-sm-10">
          <Card style={{ backgroundColor: '#aaaaaa' }}>
            <CardTitle>DataFlow</CardTitle>
            <img src='flow.jpeg' alt='dashboard' height='500px'/>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;


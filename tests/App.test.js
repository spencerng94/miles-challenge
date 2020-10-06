import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/index.js';
import Enzyme from 'enzyme';
import {shallow, configure, mount, render} from 'enzyme';
import Categories from '../src/components/Categories.jsx';
import Rewards from '../src/components/Rewards.jsx';
import axios from 'axios';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('A suite for App component', () => {
    it('should render without throwing an error', done => {
      expect(shallow(<App />).exists()).toBe(true);
      done();
    });
  
    it('should render div with className "rewards"', done => {
      const wrapper = mount(<App/>);
      expect(wrapper.exists('.rewards')).toEqual(true);
      expect(wrapper.find('.not-a-container').exists()).toEqual(false);
      done();
    });
  
    it('should render <Categories/> component', done => {
      const wrapper = mount(<App/>);
      expect(wrapper.find(TitleBar).exists()).toEqual(true);
      done();
    });
  
    it('should render <Rewards/> component', done => {
      const wrapper = mount(<App/>);
      expect(wrapper.find(ImagesList).exists()).toEqual(true);
      done();
    });

};
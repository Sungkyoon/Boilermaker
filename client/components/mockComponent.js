import { connect } from 'react-redux';
import React from 'react';

export const mockComponent = (props) => {
  return (
    <div>
      <h2>Mock Component</h2>
    </div>
  );
};

const mapStateToProps = (state) => ({
  example: state.example,
});

const mapDispatchToProps = (dispatch) => ({
  // examples: () => Thunk(ActionCreator)
});

export default connect(mapStateToProps, mapDispatchToProps)(mockComponent);

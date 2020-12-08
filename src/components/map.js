import React from "react";

class LeafletMap extends React.Component {
  static propTypes = {
    position: this.propTypes.array,
    zoom: this.propTypes.number,
    markerText: this.propTypes.string,
  };

  static defaultProps = {
    position: [],
  };
}

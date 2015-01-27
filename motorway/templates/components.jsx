var NodesContainer = React.createClass({
	render: function() {
		return (
			<div className="nodes-container">
			{$.map(this.props.nodes, function (node) {
				return (
					<div key={node.name} className="node">
						<div className="node-inner">
							<NodeCircle size={node.secondsRemaining} />
							<div className="node-content">
								<span className="node-icon"><span className={node.iconClass}></span></span>
								<h1 className="node-name">{node.title}</h1>
								<p className="node-type">{node.nodeType}</p>
								<div className="node-time">
									<p className="node-time-percentile">{Utils.formatISODuration(node.percentile)}</p>
									<p className="node-time-average">{Utils.formatISODuration(node.avgTime)}</p>
								</div>
								<h2 className="node-waiting">{node.waiting}</h2>
							</div>
							<NodeGraph items={node.latestHistogram} />
						</div>
					</div>
				)
			})}
			</div>
		)
	}
});

var NodeCircle = React.createClass({
	render: function() {
		var size = parseInt(this.props.size);
		var style = {
			'width': size,
			'height': size,
			'marginTop': -parseInt(size/2) - 20,
			'marginLeft': -parseInt(size/2) + 20
		};
		return (
			<div className="node-circle" style={style}></div>
		)
	}
});

var NodeGraph = React.createClass({
	render: function() {
		return (
			<div className="node-graph">
				{$.map(this.props.items, function (item, i) {
					var blank = {
						'height': parseInt(100-parseInt(item.value.success_percentage)-parseInt(item.value.error_percentage)-parseInt(item.value.timeout_percentage))+'%'
					};
					var success = {
						'height': parseInt(item.value.success_percentage)+'%'
					};
					var error = {
						'height': parseInt(item.value.error_percentage)+'%'
					};
					return <span className="node-graph-bar" key={item.minute}>
						<span className="node-graph-bar-part node-graph-blank" style={blank}></span>
						<span className="node-graph-bar-part node-graph-success" style={success}>{item.value.success_count}</span>
						<span className="node-graph-bar-part node-graph-timeout" style={error}>{item.value.timeout_count}</span>
						<span className="node-graph-bar-part node-graph-error" style={error}>{item.value.error_count}</span>
					</span>
				})}
			</div>
		)
	}
});

import React, { Component } from 'react';
import '../style/guestmain.scss';
export default class CreateTable extends Component {
	render() {
		const { table_header, table_content } = this.props;
		return (
			<table>
				<thead>
					<tr>
						{table_header.map((item, index) => (<th key={`th${index}`}>{item}</th>))}
					</tr>
				</thead>
				<tbody>
					{table_content.map(
						(item, index) => {
							return (
								<tr key={`content${index}`} className={index % 2 === 0 ? 'tr_odd' : 'tr_even'}>
									<td>{item.g_year}</td>
									<td>{item.g_type}</td>
									<td>{item.g_group}</td>
									<td>{item.g_name}</td>
									<td>{item.g_participants}</td>
									<td>{item.g_position}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table >
		)
	}
}
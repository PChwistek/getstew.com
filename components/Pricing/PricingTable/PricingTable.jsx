
const PricingTable = () => {
  return (
    <div className='pricing__comparison'>
      <table>
        <tr>
          <th></th>
          <th>Starter</th>
          <th>Growing</th>
          <th>Enterprise</th>
        </tr>
        <tr>
          <td>Free Users</td>
          <td>5</td>
          <td>10</td>
          <td> - </td>
        </tr>
        <tr>
          <td>User Limit</td>
          <td>100</td>
          <td>500</td>
          <td> Custom </td>
        </tr>
        <tr>
          <td>Repositories</td>
          <td>20</td>
          <td> Unlimited </td>
          <td> Custom </td>
        </tr>
        <tr>
          <td>Priority Support</td>
          <td> - </td>
          <td> Yes </td>
          <td> Yes </td>
        </tr>
        <tr>
          <td>Contract</td>
          <td> Monthly or Annually </td>
          <td> Monthly or Annually </td>
          <td> Annually </td>
        </tr>
        <tr>
          <td>Billing</td>
          <td> Credit Card </td>
          <td> Credit Card </td>
          <td> Credit Card or ACH </td>
        </tr>
      </table>
    </div>
  )
}

export default PricingTable
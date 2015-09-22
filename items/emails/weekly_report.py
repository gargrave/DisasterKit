style_th = 'text-align: left;'


from_field = 'disaster_kit <mailgun@mg.gargrave.me>'

to_field = 'rinkrinkerfink@gmail.com'

subject = 'You Weekly disaster_kit Update'

content = '''
<h3>Hello, disaster_kit user!</h3>
<p>This is your weekly update.</p>
<br>

<table>
  <tr>
    <th style="{0}">Item</th>
    <th style="{0}">Count</th>
    <th style="{0}">Expiration</th>
  </tr>
  <tr>
    <td>Graham Crackers</td>
    <td>25</td>
    <td>Soon!</td>
  </tr>
  <tr>
    <td>Ritz Sandwiches</td>
    <td>10</td>
    <td>Really soon!</td>
  </tr>
</table>
'''.format(style_th)

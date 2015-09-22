from django.core.urlresolvers import reverse


class WeeklyReport:

    def __init__(self, items):
        self.items = items
        self._from_field = 'disaster_kit <mailgun@mg.gargrave.me>'
        self._to_field = 'rinkrinkerfink@gmail.com'
        self._subject = 'Your Weekly disaster_kit Update'
        self._content = self.build_content()

    @property
    def from_field(self):
        return self._from_field

    @property
    def to_field(self):
        return self._to_field

    @property
    def subject(self):
        return self._subject

    @property
    def content(self):
        return self._content

    def build_content(self):
        # style definitions
        style_td = 'text-align: left; padding: 2px; padding-right: 35px;'

        # the greeting line
        title_line = '<h4>Hello, disaster_kit user!</h4>'

        # the basic message area, before the main table
        message = '''
        <p>
        This is your weekly update from disaster_kit.
        The following items will expire within the next 31 days:
        </p>
        <br>
        '''

        # the main table, showing items and expiration
        table = '''
        <table>
          <tr>
            <th style="{style_td}">Name</th>
            <th style="{style_td}">Count</th>
            <th style="{style_td}">Expiration</th>
          </tr>
        '''.format(style_td=style_td)

        # build the body of the table
        table_body = ''
        for i in self.items:
            table_body += '<tr>'
            # item name
            table_body += '<td style="{}">{}</td>'.format(
                style_td, i.name)
            # item count
            table_body += '<td style="{}">{}</td>'.format(
                style_td, i.count)
            # item expiration
            table_body += '<td style="{}">{}</td>'.format(
                style_td, i.date_of_expiration)
            table_body += '</tr>'
        table_body += '</table><br>'

        # the conclusion body
        conclusion = '''
        <p>
        Please take all necessary actions to consume and
        replace all of these yummy items!
        </p>
        <p>
        Your friend in the apocalypse,<br>
        disaster_kit
        </p>
        '''

        return '''
        {title_line}
        {message}
        {table}
        {table_body}
        {conclusion}
        '''.format(title_line=title_line,
                   message=message,
                   table=table,
                   table_body=table_body,
                   conclusion=conclusion)

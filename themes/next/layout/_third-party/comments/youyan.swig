{% if not (theme.duoshuo and theme.duoshuo.shortname)
  and not theme.duoshuo_shortname
  and not theme.disqus_shortname
  and not theme.hypercomments_id %}

  {% if theme.youyan_uid %}
    {% set uid = theme.youyan_uid %}

    {% if page.comments %}
      <!-- UY BEGIN -->
      <div id="uyan_frame"></div>
      <script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=2148598"></script>
      <!-- UY END -->
    {% endif %}
  {% endif %}

{% endif %}

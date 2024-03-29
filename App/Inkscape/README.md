# Inkscape

PC用のSVG編集アプリのInkscapeについてです。

# 初期設定

最近のInkscapeはデフォルト単位がmmになったりサイズ変更するとtransformが入ったりで完全にクソなので、最低限これをやっておこうという初期設定です。

## default.scvg

`C:\Users\USER_NAME\AppData\Roaming\inkscape\templates`

Windowsだとここにテンプレートを入れるようです。ここに `default.svg` というデフォルトのSVGを入れておきます。

作り方はInkscapeで新規作成してサイズ調整やデフォルトの単位を編集した後、いらない部分を手で消して上の場所に保存すればよいです。
一応一例を置いておきます。

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="1000"
   height="1000"
   viewBox="0 0 264.58333 264.58334"
   version="1.1"
   id="svg8"
   inkscape:version="0.92.1 r15371"
   sodipodi:docname="default.svg">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="0.35"
     inkscape:cx="-77.142857"
     inkscape:cy="560"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="false"
     units="px"
     inkscape:pagecheckerboard="false"
     inkscape:window-width="1707"
     inkscape:window-height="1057"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1" />
</svg>
```

## グラデーションの移動

Inkscapeはなぜか年々使いにくい方向にアップデートされていて、その１つがデフォルトでグラデーションを移動できません。グラデーションを設定した後オブジェクトを移動させるとオブジェクトだけ移動してしまいます。
それを回避するには「選択ツール」を選んだ状態で以下ブログのようにサイズ指定などの右にある作用の部分のアイコン「オブジェクトの変形に従って（フィルまたはストロークの）グラデーションも変形」をクリックしてグラデーションをくっつけて移動できるようにします。

https://yurufuwa-engineer.blogspot.com/2012/06/binkscape.html

# 小技

## transform外し

何かの操作でtransformが入るとWebで使うとき不便なので外したい場合があります。
このとき対象オブエクトをグループ化した跡解除することでtranformが消えて計算後の状態になります。

恐らくグループ化した後の計算が面倒になるとかで外しているのではないかと思います。
